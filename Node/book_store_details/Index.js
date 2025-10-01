const express = require("express");

const app = express();

// Sample book data
const books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        publishedYear: 1925,
        price: 15.99
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        publishedYear: 1960,
        price: 12.99
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        publishedYear: 1949,
        price: 14.99
    },
    {
        id: 4,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        genre: "Romance",
        publishedYear: 1813,
        price: 11.99
    }
];

// Sample member data
const members = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "555-0101",
        membershipType: "Premium",
        joinDate: "2023-01-15"
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@email.com",
        phone: "555-0102",
        membershipType: "Standard",
        joinDate: "2023-03-20"
    },
    {
        id: 3,
        name: "Mike Johnson",
        email: "mike.johnson@email.com",
        phone: "555-0103",
        membershipType: "Premium",
        joinDate: "2023-02-10"
    },
    {
        id: 4,
        name: "Sarah Wilson",
        email: "sarah.wilson@email.com",
        phone: "555-0104",
        membershipType: "Standard",
        joinDate: "2023-04-05"
    }
];

app.use(express.json());

// book and member data in console
console.log("=== BOOK STORE DETAILS ===");
console.log("\n📚 BOOKS:");
books.forEach(book => {
    console.log(`ID: ${book.id} | Title: ${book.title} | Author: ${book.author} | Genre: ${book.genre} | Year: ${book.publishedYear} | Price: $${book.price}`);
});

console.log("\n👥 MEMBERS:");
members.forEach(member => {
    console.log(`ID: ${member.id} | Name: ${member.name} | Email: ${member.email} | Phone: ${member.phone} | Membership: ${member.membershipType} | Joined: ${member.joinDate}`);
});

console.log("\n🚀 Server is starting...");

app.listen(3000, () => {
    console.log("✅ Server is running on port 3000");
    console.log("📊 Total Books: " + books.length);
    console.log("👤 Total Members: " + members.length);
});
