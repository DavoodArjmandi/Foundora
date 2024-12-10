using IdentityService.Application.CQRS.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace IdentityService.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILogger<AuthController> _logger;


        public AuthController(IMediator mediator, ILogger<AuthController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserCommand command)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _mediator.Send(command);
            return Ok("User registered successfully");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginCommand command)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogInformation("Login attempt for username: {Username}", command.Username);
                return BadRequest(ModelState);
            }

            try
            {
                var token = await _mediator.Send(command);
                return Ok(new { Token = token });
            }
            catch (Exception ex)
            {
                _logger.LogInformation("Login attempt for username: {Username}", command.Username);
                throw;
            }
        }
    }
}
