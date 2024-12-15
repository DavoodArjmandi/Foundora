using IdentityService.Application.Common.Interfaces;
using IdentityService.Application.CQRS.Commands.Handlers;
using IdentityService.Application.Interfaces;
using IdentityService.Infrastructure.Persistence.Repositories;

namespace IdentityService.Api.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IRoleRepository, RoleRepository>();

            // Register MediatR with assembly scanning
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(RegisterUserCommandHandler).Assembly));

            return services;
        }
    }

}
