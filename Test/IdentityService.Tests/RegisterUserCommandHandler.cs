using IdentityService.Application.Common.Interfaces;
using IdentityService.Application.CQRS.Commands;
using IdentityService.Application.CQRS.Commands.Handlers;
using IdentityService.Application.Interfaces;
using Moq;

public class RegisterUserCommandHandlerTests
{
    [Fact]
    public async Task Handle_Should_Add_User_To_Repository_And_Assign_Default_Role()
    {
        // Arrange
        var mockRepoUser = new Mock<IUserRepository>();
        var mockRepoRole = new Mock<IRoleRepository>();

        // Mock the default role retrieval
        var defaultRole = new IdentityService.Domain.Entities.Role("User");
        mockRepoRole
            .Setup(repo => repo.GetByNameAsync(It.IsAny<string>()))
            .ReturnsAsync(defaultRole);

        var handler = new RegisterUserCommandHandler(mockRepoUser.Object, mockRepoRole.Object);

        var command = new RegisterUserCommand
        {
            Username = "testuser",
            Email = "test@example.com",
            Password = "Password123!"
        };

        // Act
        await handler.Handle(command, default);

        // Assert
        mockRepoRole.Verify(repo => repo.GetByNameAsync("User"), Times.Once, "Should fetch the default 'User' role from the repository.");
        mockRepoUser.Verify(repo => repo.AddAsync(It.Is<IdentityService.Domain.Entities.User>(
            user => user.Username == "testuser" &&
                    user.Email == "test@example.com" &&
                    user.UserRoles.Any(ur => ur.Role.Name == "User")
        )), Times.Once, "Should add the user with the default role.");
        mockRepoUser.Verify(repo => repo.SaveChangesAsync(), Times.Once, "Should save changes to the user repository.");
    }
}