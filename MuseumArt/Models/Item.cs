namespace MuseumArt.Models
{
    public class Items
    {
        public Item[] collection { get; set; }
    }

    public class Item
    {
        public string id { get; set; }
        public string name { get; set; }
        public string type { get; set; }
        public string url { get; set; }
        public string description { get; set; }
    }

}
