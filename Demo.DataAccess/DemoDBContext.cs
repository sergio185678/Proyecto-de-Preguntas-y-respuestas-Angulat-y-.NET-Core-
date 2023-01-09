using Demo.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Demo.DataAccess
{
    public class DemoDBContext:DbContext
    {
        public DemoDBContext()
        {

        }
        public DemoDBContext(DbContextOptions<DemoDBContext> options):base(options)
        {

        }
        public DbSet<Usuario> Usuarios { get; set; }
    }
}
