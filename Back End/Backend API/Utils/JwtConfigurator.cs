using Demo.Entities;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Backend_API.Utils
{
    public class JwtConfigurator
    {
        public static string GetToken(Usuario usuarioInfo,IConfiguration configuration)
        {
            string Secretkey = configuration["Jwt:SecretKey"];
            string Issuer = configuration["Jwt:Issuer"];
            string Audience = configuration["Jwt:Audience"];
            
            var securityKey=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Secretkey));
            var credentials=new SigningCredentials(securityKey,SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub,usuarioInfo.NombreUsuario),
                new Claim("idUsuario",usuarioInfo.Id.ToString())
            };
            var token = new JwtSecurityToken(
                issuer: Issuer,
                audience: Audience,
                claims,
                expires: DateTime.Now.AddDays(1),//tiempo que el token dure(1dia)
                signingCredentials: credentials
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public static int GetTokenIdUsuario(ClaimsIdentity identity)
        {
            if(identity != null)
            {
                IEnumerable<Claim> claims=identity.Claims;
                foreach(var claim in claims)
                {
                    if(claim.Type== "idUsuario")
                    {
                        return int.Parse(claim.Value);
                    }
                }
            }
            return 0;
        }
    }
}
