using System.ComponentModel.DataAnnotations;
using MediatR;

namespace IdentityService.Application.CQRS.Commands
{
    public class RegisterUserCommand : IRequest<Unit>
    {
        [Required]
        [MinLength(8)]
        [MaxLength(64)]
        public string Username { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [MinLength(8)]
        [MaxLength(64)]
        public string Password { get; set; }
    }
}