using IdentityService.Application.CQRS.Commands;
using IdentityService.Application.CQRS.Commands.Handlers;
using IdentityService.Application.Interfaces;
using Moq;
using Xunit;

public class RegisterUserCommandHandlerTests
{
    [Fact]
    public async Task Handle_Should_Add_User_To_Repository()
    {
        // Arrange
        var mockRepo = new Mock<IUserRepository>();
        var handler = new RegisterUserCommandHandler(mockRepo.Object);

        var command = new RegisterUserCommand
        {
            Username = "testuser",
            Email = "test@example.com",
            Password = "Password123!"
        };

        // Act
        await handler.Handle(command, default);

        // Assert
        mockRepo.Verify(repo => repo.AddAsync(It.IsAny<IdentityService.Domain.Entities.User>()), Times.Once);
        mockRepo.Verify(repo => repo.SaveChangesAsync(), Times.Once);
    }
}