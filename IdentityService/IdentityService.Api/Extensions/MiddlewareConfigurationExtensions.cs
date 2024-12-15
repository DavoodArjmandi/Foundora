using AspNetCoreRateLimit;
using Serilog;

namespace IdentityService.Api.Extensions
{
    public static class MiddlewareConfigurationExtensions
    {
        public static void UseMiddlewareConfigurations(this WebApplication app)
        {
            // Health checks
            app.MapHealthChecks("/health");

            // Enable CORS
            app.UseCors("AllowedOriginsPolicy");

            // Rate limiting
            app.UseIpRateLimiting();

            // Serilog request logging
            app.UseSerilogRequestLogging();

            // IdentityServer authentication
            app.UseIdentityServer();
            app.UseAuthentication();
            app.UseAuthorization();

            // Swagger (only in development)
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // HTTPS redirection
            app.UseHttpsRedirection();

            // Map controllers
            app.MapControllers();
        }
    }
}
