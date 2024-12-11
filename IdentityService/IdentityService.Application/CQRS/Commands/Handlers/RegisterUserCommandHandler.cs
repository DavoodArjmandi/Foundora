using MediatR;
using IdentityService.Application.Interfaces;
using IdentityService.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;
using IdentityService.Application.Common.Interfaces;

namespace IdentityService.Application.CQRS.Commands.Handlers
{
    public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, Unit>
    {
        private readonly IUserRepository _userRepository;
        private readonly IRoleRepository _roleRepository;

        public RegisterUserCommandHandler(IUserRepository userRepository, IRoleRepository roleRepository)
        {
            _userRepository = userRepository;
            _roleRepository = roleRepository;
        }

        public async Task<Unit> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {
            // Create a new user
            var user = new User(request.Username, request.Email, BCrypt.Net.BCrypt.HashPassword(request.Password));

            var defaultRole = await _roleRepository.GetByNameAsync("User");
            if (defaultRole == null)
                throw new Exception("Default role not found.");

            user.AddRole(defaultRole);

            // Persist the user
            await _userRepository.AddAsync(user);
            await _userRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}