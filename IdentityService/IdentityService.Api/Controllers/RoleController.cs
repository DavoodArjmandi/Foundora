using IdentityService.Application.Common.Interfaces;
using IdentityService.Application.DTOs;
using IdentityService.Application.Interfaces;
using IdentityService.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace IdentityService.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoleController : ControllerBase
    {
        private readonly IRoleRepository _roleRepository;
        private readonly IUserRepository _userRepository;

        public RoleController(IRoleRepository roleRepository, IUserRepository userRepository)
        {
            _roleRepository = roleRepository;
            _userRepository = userRepository;
        }

        // 1. Get all roles
        [HttpGet]
        public async Task<IActionResult> GetAllRoles()
        {
            var roles = await _roleRepository.GetAllAsync();
            var roleDtos = roles.Select(role => new RoleDto
            {
                Id = role.Id,
                Name = role.Name,
                UserIds = role.UserRoles.Select(x=>x.UserId).ToList()
            }).ToList();

            return Ok(roleDtos);
        }

        // 2. Create a new role
        [HttpPost]
        public async Task<IActionResult> CreateRole([FromBody] CreateRoleRequestDto request)
        {
            if (string.IsNullOrWhiteSpace(request.RoleName))
                return BadRequest("RoleName cannot be empty.");

            var existingRole = await _roleRepository.GetByNameAsync(request.RoleName);
            if (existingRole != null)
                return Conflict("Role already exists.");

            var role = new Role(request.RoleName);
            await _roleRepository.AddAsync(role);
            await _roleRepository.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAllRoles), new { id = role.Id }, role);
        }

        // 3. Assign a role to a user
        [HttpPost("assign")]
        public async Task<IActionResult> AssignRoleToUser([FromBody] UserRoleAssignmentRequest request)
        {
            var user = await _userRepository.GetByIdAsync(request.UserId);
            if (user == null)
                return NotFound("User not found.");

            var role = await _roleRepository.GetByNameAsync(request.RoleName);
            if (role == null)
                return NotFound("Role not found.");

            user.AddRole(role);
            await _userRepository.SaveChangesAsync();

            return Ok("Role assigned to user.");
        }

        // 4. Remove a role from a user
        [HttpPost("remove")]
        public async Task<IActionResult> RemoveRoleFromUser([FromBody] UserRoleAssignmentRequest request)
        {
            var user = await _userRepository.GetByIdAsync(request.UserId);
            if (user == null)
                return NotFound("User not found.");

            var role = await _roleRepository.GetByNameAsync(request.RoleName);
            if (role == null)
                return NotFound("Role not found.");

            user.RemoveRole(role);
            await _userRepository.SaveChangesAsync();

            return Ok("Role removed from user.");
        }
    }

    public class UserRoleAssignmentRequest
    {
        public Guid UserId { get; set; }
        public string RoleName { get; set; }
    }
}