namespace MuseumArt.Models
{
    public class Tree
    {
        public string id { get; set; }
        public string name { get; set; }
        public string type { get; set; }
        public Collection1[] collection { get; set; }
    }

    public class Collection1
    {
        public string id { get; set; }
        public string name { get; set; }
        public string type { get; set; }
        public Collection2[] collection { get; set; }
    }

    public class Collection2
    {
        public string id { get; set; }
        public string name { get; set; }
        public string type { get; set; }
        public object[] collection { get; set; }
    }

}
