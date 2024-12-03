using MediatR;

namespace IdentityService.Application.CQRS.Commands
{
    public class RegisterUserCommand : IRequest<Unit>
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}