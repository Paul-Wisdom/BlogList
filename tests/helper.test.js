const listHelper = require('../utils/list_helper');

test("dummmy returns 1 ", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
});

describe("total likes", () => {
    const listWithNoBlog = [];
    const listWithOneBlog = [
        {
            _id: '35467890998796',
            title: 'Go to blah',
            author: 'Edgar',
            url: 'http://www.dfgjhlkhgh.com',
            likes: 5,
            __v: 0
        }
    ]
    const listWithMultipleBlogs = [
        {
            _id: '35467890998796',
            title: 'Go to blah',
            author: 'Edgar',
            url: 'http://www.dfgjhlkhgh.com',
            likes: 5,
            __v: 0
        },
        {
            _id: '354998796',
            title: 'to blah',
            author: 'Egar',
            url: 'http://www.dfgjhlkhgh.com',
            likes: 0,
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
    ];

    test('of empty list', () => {
        const result = listHelper.totalLikes(listWithNoBlog);
        expect(result).toBe(0)
    });
    test('when list has only one blog', () => {
        const result = listHelper.totalLikes(listWithOneBlog);
        expect(result).toBe(5)
    });
    test('when list has multiple blogs', () => {
        const result = listHelper.totalLikes(listWithMultipleBlogs);
        expect(result).toBe(38)
    });
})

describe('Favorite blogs', () => {
    const listWithNoBlog = [];
    const listWithOneBlog = [
        {
            _id: '35467890998796',
            title: 'Go to blah',
            author: 'Edgar',
            url: 'http://www.dfgjhlkhgh.com',
            likes: 5,
            __v: 0
        }
    ]
    const listWithMultipleBlogs = [
        {
            _id: '35467890998796',
            title: 'Go to blah',
            author: 'Edgar',
            url: 'http://www.dfgjhlkhgh.com',
            likes: 5,
            __v: 0
        },
        {
            _id: '354998796',
            title: 'to blah',
            author: 'Egar',
            url: 'http://www.dfgjhlkhgh.com',
            likes: 0,
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
    ];
    
    test("with empty list", () => {
        const result = listHelper.favoriteBlog(listWithNoBlog);

        expect(result).toBe(null);
    });
    test("when list contains a blog", () => {
        const result = listHelper.favoriteBlog(listWithOneBlog);

        expect(result).toEqual(listWithOneBlog[0]);
    });
    test("when list contains multiple blogs", () => {
        const result = listHelper.favoriteBlog(listWithMultipleBlogs);

        expect(result).toEqual(listWithMultipleBlogs[2]);
    });
});

describe("most Blogs", () => {

    const listWithNoBlog = [];
    const listWithOneBlog = [
        {
            _id: '35467890998796',
            title: 'Go to blah',
            author: 'Edgar',
            url: 'http://www.dfgjhlkhgh.com',
            likes: 5,
            __v: 0
        }
    ];
    const listWithMultipleBlogs = [
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
            likes: 0,
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

    test("when list contains no blogs", () => {
        const result = listHelper.mostBlogs(listWithNoBlog);
        expect(result).toBe(null);
    });
    test("when list contains a blog", () => {
        const result = listHelper.mostBlogs(listWithOneBlog);
        expect(result).toEqual({author: 'Edgar', blogs: 1});
    });
    test("when list contains multiple blogs", () => {
        const result = listHelper.mostBlogs(listWithMultipleBlogs);
        expect(result).toEqual({ author: 'Ear', blogs: 3 });
    })
});

describe("most likes", () => {
    const listWithNoBlog = [];
    const listWithOneBlog = [
        {
            _id: '35467890998796',
            title: 'Go to blah',
            author: 'Edgar',
            url: 'http://www.dfgjhlkhgh.com',
            likes: 5,
            __v: 0
        }
    ];
    const listWithMultipleBlogs = [
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

    test("when list contains no blogs", () => {
        const result = listHelper.mostLikes(listWithNoBlog);
        expect(result).toBe(null);
    });
    test("when list contains a blog", () => {
        const result = listHelper.mostLikes(listWithOneBlog);
        expect(result).toEqual({author: 'Edgar', likes: 5});
    });
    test("when list contains multiple blogs", () => {
        const result = listHelper.mostLikes(listWithMultipleBlogs);
        expect(result).toEqual({ author: 'Ear', likes: 15 });
    })
})