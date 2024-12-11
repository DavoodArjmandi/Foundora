using IdentityService.Domain.Entities;

namespace IdentityService.Application.Common.Interfaces
{
    public interface IRoleRepository
    {
        Task<Role> GetByNameAsync(string roleName);
        Task<IEnumerable<Role>> GetAllAsync();
        Task AddAsync(Role role);
        Task SaveChangesAsync();
    }
}