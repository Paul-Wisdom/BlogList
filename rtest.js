const mostLikes = (blogs) => {
    let mostLikes = 0;
    

    if(blogs.length === 0) {
        return null
    }

    
    else if (blogs.length === 1) return {author: blogs[0].author, likes: blogs[0].likes};

    else{
        let mostLikesAuthor = blogs[0].author;
        let authors = blogs.map(blog => blog.author);

        authors = new Set(authors);
        const allAuthors = [... authors];
        for (author of allAuthors)
        {
            const authorBlogs = blogs.filter(blog => blog.author === author)
            const reducer = (sum, blog) => {
                return (sum + blog.likes);
            }
            const authorLikes = authorBlogs.reduce(reducer, 0);
            if (authorLikes > mostLikes)
        {
                mostLikesAuthor = author;
                mostLikes = authorLikes;
            }
        }

        return{
            author: mostLikesAuthor,
            likes: mostLikes
        }
    }
}

const blogs = [
    {
        _id: '35467890998796',
        title: 'Go to blah',
        author: 'Ear',
        url: 'http://www.dfgjhlkhgh.com',
        likes: 5,
        __v: 0
    },
    {
        _id: '354998796',
        title: 'to blah',
        author: 'Ear',
        url: 'http://www.dfgjhlkhgh.com',
        likes: 3,
        __v: 0
    },
    {
        _id: '67890998796',
        title: 'blah',
        author: 'dgar',
        url: 'http://www.dfgjhlkhgh.com',
        likes: 13,
        __v: 0
    },
    {
        _id: '354678909',
        title: 'Go blah',
        author: 'Edgar',
        url: 'http://www.dfgjhlkhgh.com',
        likes: 13,
        __v: 0
    },
    {
        _id: '98796',
        title: 'Go to',
        author: 'Ear',
        url: 'http://www.dfgjhlkhgh.com',
        likes: 7,
        __v: 0
    }

]
const t = mostLikes(blogs);
console.log(t);