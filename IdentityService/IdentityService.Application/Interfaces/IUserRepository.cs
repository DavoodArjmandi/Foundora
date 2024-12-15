using IdentityService.Domain.Entities;

namespace IdentityService.Application.Interfaces
{
    public interface IUserRepository
    {
        Task<List<User>> GetAllAsync();

        Task<User> GetByIdAsync(Guid userId);
        Task<User?> GetByUsernameAsync(string username);
        Task AddAsync(User user);
        Task DeleteAsync(Guid id);
        Task SaveChangesAsync();
    }
}