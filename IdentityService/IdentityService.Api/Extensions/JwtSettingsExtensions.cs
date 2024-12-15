using IdentityService.Application.Settings;

namespace IdentityService.Api.Extensions
{
    public static class JwtSettingsExtensions
    {
        public static IServiceCollection AddJwtSettings(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddOptions<JwtSettings>()
                .Bind(configuration.GetSection("JwtSettings"))
                .Validate(settings =>
                    !string.IsNullOrWhiteSpace(settings.Secret) &&
                    settings.Secret.Length >= 16 &&
                    settings.ExpirationInMinutes > 0,
                    "Invalid JwtSettings configuration");

            return services;
        }
    }
}
