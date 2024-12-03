using MediatR;

namespace IdentityService.Application.CQRS.Commands
{
    public class LoginCommand : IRequest<string> // Returns a JWT token
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}