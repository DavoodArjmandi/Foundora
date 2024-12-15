using Duende.IdentityServer.Models;
using IdentityService.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Api.Extensions
{
    public static class InfrastructureServiceExtensions
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentityServer()
                .AddInMemoryClients(new List<Client>
                {
                new Client
                {
                    ClientId = "client",
                    AllowedGrantTypes = GrantTypes.ClientCredentials,
                    ClientSecrets = { new Secret("client_secret".Sha256()) },
                    AllowedScopes = { "api1" }
                }
                })
                .AddInMemoryApiScopes(new List<ApiScope>
                {
                new ApiScope("api1", "My API")
                })
                .AddDeveloperSigningCredential();

            return services;
        }
    }
}
