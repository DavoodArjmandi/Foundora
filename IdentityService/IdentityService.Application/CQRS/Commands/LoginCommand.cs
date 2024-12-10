using System.ComponentModel.DataAnnotations;
using MediatR;

namespace IdentityService.Application.CQRS.Commands
{
    public class LoginCommand : IRequest<string> // Returns a JWT token
    {
        [Required]
        [MinLength(8)]
        [MaxLength(64)]
        public string Username { get; set; }
        [Required]
        [MinLength(8)]
        public string Password { get; set; }
    }
}