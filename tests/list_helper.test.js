const { dummy, totalLikes, favoriteBlog } = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of an empty list is zero', () => {
    const blogs = []

    const result = totalLikes(blogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const blogs = [
      {
        title: "Hello, world!",
        author: "Kace",
        url: "www.google.com",
        likes: 5,
        id: "5e9b560d99a17f1c8ed08d69"
      }
    ]

    const result = totalLikes(blogs)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const blogs = [
      {
        title: "Hello, world!",
        author: "Kace",
        url: "www.google.com",
        likes: 5,
        id: "5e9b560d99a17f1c8ed08d69"
      },
      {
        title: "Something",
        author: "Kace",
        url: "www.example.com",
        likes: 10,
        id: "5e9a560d99a17f1c8ed08d69"
      }
    ]

    const result = totalLikes(blogs)
    expect(result).toBe(15)
  })
})

describe('favorite blog', () => {
  test('of an empty list is undefined', () => {
    const blogs = []

    const result = favoriteBlog(blogs)
    expect(result).toEqual(undefined)
  })

  test('when a list has only one blog equals that blog', () => {
    const blogs = [
      {
        title: "Hello, world!",
        author: "Kace",
        url: "www.google.com",
        likes: 5,
        id: "5e9b560d99a17f1c8ed08d69"
      }
    ]

    const result = favoriteBlog(blogs)
    expect(result).toEqual(blogs[0])
  })

  test('of a bigger list is calculated right', () => {
    const blogs = [
      {
        title: "Hello, world!",
        author: "Kace",
        url: "www.google.com",
        likes: 5,
        id: "5e9b560d99a17f1c8ed08d69"
      },
      {
        title: "Something",
        author: "Kace",
        url: "www.example.com",
        likes: 10,
        id: "5e9a560d99a17f1c8ed08d69"
      }
    ]

    const result = favoriteBlog(blogs)
    expect(result).toEqual(blogs[1])
  })
})
