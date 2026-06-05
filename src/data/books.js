const BOOKS = [
  {
    id: 1, title: "Atomic Habits", author: "James Clear",
    genre: "Self-Help", mrp: 599, price: 480,
    rating: 4.8, reviews: 12453, stock: 42,
    format: ["Paperback", "Hardcover"],
    isBestSeller: true, isBookToScreen: false, isPreOrder: false,
    description: "An easy and proven way to build good habits and break bad ones. Tiny changes, remarkable results.",
    cover: "https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg"
  },
  {
    id: 2, title: "The Silent Patient", author: "Alex Michaelides",
    genre: "Thriller", mrp: 399, price: 320,
    rating: 4.6, reviews: 8921, stock: 28,
    format: ["Paperback"],
    isBestSeller: true, isBookToScreen: true, isPreOrder: false,
    description: "A famous painter shoots her husband five times and then never speaks another word.",
    cover: "https://images-na.ssl-images-amazon.com/images/I/91lslnZ-btL.jpg"
  },
  {
    id: 3, title: "Ikigai", author: "Hector Garcia",
    genre: "Self-Help", mrp: 599, price: 570,
    rating: 4.5, reviews: 7832, stock: 55,
    format: ["Paperback", "Hardcover"],
    isBestSeller: true, isBookToScreen: false, isPreOrder: false,
    description: "The Japanese secret to a long and happy life — find your reason for being.",
    cover: "https://images-na.ssl-images-amazon.com/images/I/71oEbqXVYAL.jpg"
  },
  {
    id: 4, title: "Verity", author: "Colleen Hoover",
    genre: "Thriller", mrp: 399, price: 320,
    rating: 4.7, reviews: 15672, stock: 33,
    format: ["Paperback"],
    isBestSeller: true, isBookToScreen: true, isPreOrder: false,
    description: "A struggling writer accepts a job offer that sends her life spiraling out of control.",
    cover: "https://images-na.ssl-images-amazon.com/images/I/91zqaLfGPBL.jpg"
  },
  {
    id: 5, title: "Dune", author: "Frank Herbert",
    genre: "Sci-Fi", mrp: 699, price: 594,
    rating: 4.9, reviews: 22341, stock: 19,
    format: ["Paperback", "Hardcover"],
    isBestSeller: true, isBookToScreen: true, isPreOrder: false,
    description: "The greatest science fiction novel ever written. A saga of politics, religion and power.",
    cover: "https://images-na.ssl-images-amazon.com/images/I/A1u+2fY5yTL.jpg"
  },
  {
    id: 6, title: "A Little Life", author: "Hanya Yanagihara",
    genre: "Fiction", mrp: 699, price: 595,
    rating: 4.8, reviews: 9102, stock: 14,
    format: ["Paperback"],
    isBestSeller: true, isBookToScreen: false, isPreOrder: false,
    description: "A shattering portrait of a young man and the love of the friends who carry him through life.",
    cover: "https://images-na.ssl-images-amazon.com/images/I/71r6fBGZDDL.jpg"
  },
  {
    id: 7, title: "The Midnight Library", author: "Matt Haig",
    genre: "Fiction", mrp: 699, price: 665,
    rating: 4.6, reviews: 11203, stock: 37,
    format: ["Paperback", "Hardcover"],
    isBestSeller: true, isBookToScreen: true, isPreOrder: false,
    description: "Between life and death there is a library. Its books give you a chance to try another life.",
    cover: "https://images-na.ssl-images-amazon.com/images/I/81J6APjwxlL.jpg"
  },
  {
    id: 8, title: "Project Hail Mary", author: "Andy Weir",
    genre: "Sci-Fi", mrp: 599, price: 570,
    rating: 4.9, reviews: 8754, stock: 22,
    format: ["Paperback"],
    isBestSeller: false, isBookToScreen: true, isPreOrder: false,
    description: "A lone astronaut must save the earth — but first he has to remember who he is.",
    cover: "https://images-na.ssl-images-amazon.com/images/I/81zHNtB9FGL.jpg"
  },
  {
    id: 9, title: "The 48 Laws of Power", author: "Robert Greene",
    genre: "Business", mrp: 999, price: 850,
    rating: 4.7, reviews: 18930, stock: 41,
    format: ["Paperback", "Hardcover"],
    isBestSeller: true, isBookToScreen: false, isPreOrder: false,
    description: "Amoral, cunning, ruthless and instructive — the 48 laws to understand power.",
    cover: "https://images-na.ssl-images-amazon.com/images/I/71aG+xDKSYL.jpg"
  },
  {
    id: 10, title: "Tuesdays With Morrie", author: "Mitch Albom",
    genre: "Non-Fiction", mrp: 299, price: 240,
    rating: 4.8, reviews: 14321, stock: 60,
    format: ["Paperback"],
    isBestSeller: true, isBookToScreen: true, isPreOrder: false,
    description: "An old man, a young man, and life's greatest lesson. A book that changed millions.",
    cover: "https://images-na.ssl-images-amazon.com/images/I/61T7LXVINBL.jpg"
  },
  {
    id: 11, title: "It Ends With Us", author: "Colleen Hoover",
    genre: "Romance", mrp: 499, price: 450,
    rating: 4.6, reviews: 19872, stock: 48,
    format: ["Paperback"],
    isBestSeller: true, isBookToScreen: true, isPreOrder: false,
    description: "A brave and heartbreaking novel that digs its claws into you and never lets go.",
    cover: "https://images-na.ssl-images-amazon.com/images/I/71ik6CYc4hL.jpg"
  },
  {
    id: 12, title: "The Palace of Illusions", author: "Chitra Banerjee",
    genre: "Mythology", mrp: 499, price: 425,
    rating: 4.7, reviews: 6543, stock: 31,
    format: ["Paperback", "Hardcover"],
    isBestSeller: true, isBookToScreen: false, isPreOrder: false,
    description: "The Mahabharata retold from the point of view of Draupadi — fierce, beautiful, complex.",
    cover: "https://images-na.ssl-images-amazon.com/images/I/81S8EtGgOkL.jpg"
  },
  {
    id: 13, title: "Mestra", author: "Madeline Miller",
    genre: "Mythology", mrp: 499, price: 475,
    rating: 4.5, reviews: 0, stock: 0,
    format: ["Hardcover"],
    isBestSeller: false, isBookToScreen: false, isPreOrder: true,
    releaseDate: "2025-09-15",
    description: "The highly anticipated new novel from the author of Circe and The Song of Achilles.",
    cover: "https://images-na.ssl-images-amazon.com/images/I/71JZi1ZRFZL.jpg"
  },
  {
    id: 14, title: "The Law of the Sublime", author: "Robert Greene",
    genre: "Business", mrp: 999, price: 899,
    rating: 4.5, reviews: 0, stock: 0,
    format: ["Hardcover"],
    isBestSeller: false, isBookToScreen: false, isPreOrder: true,
    releaseDate: "2025-10-01",
    description: "Robert Greene's next masterwork — the art of achieving the extraordinary.",
    cover: "https://images-na.ssl-images-amazon.com/images/I/71aG+xDKSYL.jpg"
  },
  {
    id: 15, title: "Vibe", author: "Adam Grant",
    genre: "Self-Help", mrp: 999, price: 950,
    rating: 4.4, reviews: 0, stock: 0,
    format: ["Hardcover"],
    isBestSeller: false, isBookToScreen: false, isPreOrder: true,
    releaseDate: "2025-11-10",
    description: "The secrets of strong connections in a lonely world from the #1 bestselling author.",
    cover: "https://images-na.ssl-images-amazon.com/images/I/71oEbqXVYAL.jpg"
  }
];

export default BOOKS;
