const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    let totalLikes = 0;

    if (blogs.length === 0)
    {
        return totalLikes;
    }
    else if (blogs.length === 1)
    {
        return blogs[0].likes;
    }

    else{
        for (blog of blogs){
            totalLikes += blog.likes
        }
        return totalLikes;
    }
}

const favoriteBlog = (blogs) => {
    let fav = blogs[0];
    let mostLikes = 0;

    if (blogs.length === 0){
        return null;
    }
    else if(blogs.length === 1)
    {
        return fav;
    }
    else {
        for (blog of blogs)
        {
            if(blog.likes > mostLikes)
            {
                fav = blog;
                mostLikes = blog.likes;
            }
        }
        return fav;
    }
}

const mostBlogs = (blogs) => {
    let mostBlogs = 0;
    

    if(blogs.length === 0) {
        return null
    }

    
    else if (blogs.length === 1) return {author: blogs[0].author, blogs: 1};

    else{
        let mostBlogsAuthor = blogs[0].author;
        let authors = blogs.map(blog => blog.author);

        authors = new Set(authors);
        const allAuthors = [... authors];
        for (author of allAuthors)
        {
            const authorBlogs = blogs.filter(blog => blog.author === author);
            if (authorBlogs.length > mostBlogs)
            {
                mostBlogsAuthor = author;
                mostBlogs = authorBlogs.length;
            }
        }

        return {
            author: mostBlogsAuthor,
            blogs: mostBlogs
        }
    }
}

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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}