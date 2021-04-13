using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using MuseumArt.Models;

namespace MuseumArt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CollectionController : ControllerBase
    {
        private readonly string tree = null;
        private readonly string collection = null;
        public CollectionController()
        {
            try
            {
                tree = System.IO.File.ReadAllText("Resources\\tree.json");
                collection = System.IO.File.ReadAllText("Resources\\collection.json");
            }
            catch
            {
                Console.WriteLine("File Not Found");
            }
        }

        [HttpGet]
        public IActionResult GetCollection()
        {
            return Ok(JsonSerializer.Deserialize<Tree>(tree));
        }

        [HttpGet("{id}")]
        public IActionResult GetCollection(string id)
        {
            Items items = JsonSerializer.Deserialize<Items>(collection);

            Item item = items.collection.Where(i => i.id == id).FirstOrDefault();

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }
    }
}