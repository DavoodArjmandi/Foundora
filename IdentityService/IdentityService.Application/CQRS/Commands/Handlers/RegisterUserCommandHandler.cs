using MediatR;
using IdentityService.Application.Interfaces;
using IdentityService.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace IdentityService.Application.CQRS.Commands.Handlers
{
    public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, Unit>
    {
        private readonly IUserRepository _userRepository;

        public RegisterUserCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<Unit> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {
            // Create a new user
            var user = new User(request.Username, request.Email, BCrypt.Net.BCrypt.HashPassword(request.Password));

            // Persist the user
            await _userRepository.AddAsync(user);
            await _userRepository.SaveChangesAsync();

            return Unit.Value; // Return a Unit to indicate a successful operation
        }
    }
}