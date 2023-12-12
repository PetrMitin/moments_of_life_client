import moment, { Moment } from "moment"
import { IComment, ICommentLike } from "./interfaces/commentInterfaces"
import { IMoment, IMomentLike, ITag } from "./interfaces/momentsInterfaces"
import { IProfile } from "./interfaces/userInterfaces"
import { ICommentLikeEvent, IEvent, IMomentLikeEvent, ISubscriptionEvent } from "./interfaces/eventsInterfaces"

export const mockMoments = (amount: number, users: IProfile[]): IMoment[] => {
    const moments: IMoment[] = []
    for (let i = 0; i < amount; ++i) {
        const newMoment: IMoment = {
            id: Math.random(),
            title: `Title ${i}`,
            content: `Content ${i}. Line 1:25:  'useState' is defined but never used                                                                         @typescript-eslint/no-unused-vars
            Line 2:10:  'IMoment' is defined but never used                                                                          @typescript-eslint/no-unused-vars
            Line 13:8:  React Hook useEffect has a missing dependency: 'dispatch'. Either include it or remove the dependency array`,
            author: users[Math.floor(Math.random() * users.length)],
            creation_date: (new Date()).toUTCString(),
            image: 'https://img.freepik.com/free-photo/beautiful-butterfly-in-nature_23-2150445576.jpg',
            comments: [],
            tags: [],
            is_liked: false
        }
        newMoment.comments = mockComments(15, newMoment.id, users[Math.floor(Math.random() * users.length)])
        newMoment.tags = mockTags(10, newMoment.id)
        moments.push(newMoment)
    }
    return moments
}

export const mockUsers = (amount: number): IProfile[] => {
    const users: IProfile[] = []
    for (let i = 0; i < amount; ++i) {
        const newUser: IProfile = {
            id: 39,
            user: {
                id: 39,
                email: `xmpl${i}@mail.ru`,
                username: `username${i}`,
                password: 'asdasd',
            },
            avatar: 'https://img.freepik.com/free-photo/beautiful-butterfly-in-nature_23-2150445576.jpg',
            registration_date: (new Date()).toUTCString(),
            rating: Math.ceil(Math.random() * 100),
            number_of_moments: 100,
            number_of_subscribers: 100,
            number_of_subscriptions: 100
        }
        users.push(newUser)
    }
    return users
}

export const mockComments = (amount: number, moment_id: number, author: IProfile) => {
    const newComments: IComment[] = []
    for (let i = 0; i < amount; ++i) {
        const newComment: IComment = {
            id: Math.random(),
            content: 'Content',
            author: author,
            moment_id,
            creation_date: (new Date()).toUTCString(),
            is_liked: false
        }
        newComments.push(newComment)
    }
    return newComments
}

export const mockTags = (amount: number, moment_id: number) => {
    const tags: ITag[] = []
    for (let i = 0; i < amount; ++i) {
        const newTag: ITag = {
            id: Math.random(),
            tag: `#tag${Math.random()}`,
            moment_id
        }
        tags.push(newTag)
    }
    return tags
}

export const mockMomentLikes = (amount: number, moment: IMoment, author: IProfile): IMomentLike[] => {
    const likes: IMomentLike[] = []
    for (let i = 0; i < amount; ++i) {
        const newLike: IMomentLike = {
            id: Math.random(),
            moment_id: moment.id,
            author_id: author.id,
            creation_date: (new Date()).toUTCString()
        } 
        likes.push(newLike)
    }
    return likes
}

export const mockCommentLikes = (amount: number, comment: IComment, author_id: number): ICommentLike[] => {
    const likes: ICommentLike[] = []
    for (let i = 0; i < amount; ++i) {
        const newLike: ICommentLike = {
            id: Math.random(),
            comment_id: comment.id,
            author_id,
            moment_id: comment.moment_id,
            creation_date: (new Date()).toUTCString()
        } 
        likes.push(newLike)
    }
    return likes
}

export const mockEvents = (amount: number) => {
    const users = mockUsers(5)
    const events: IEvent[] = []
    for (let i = 0; i < amount; ++i) {
        const momentLikeEvent: IMomentLikeEvent = {
            id: Math.random(),
            author: users[Math.floor(Math.random() * 5)],
            creation_date: (new Date()).toUTCString(),
            event_type: 'like/moment',
            moment: {} as IMoment,

        }
        events.push(momentLikeEvent)
    }
    for (let i = 0; i < amount; ++i) {
        const commentLikeEvent: ICommentLikeEvent = {
            id: Math.random(),
            author: users[Math.floor(Math.random() * 5)],
            creation_date: (new Date()).toUTCString(),
            event_type: 'like/comment',
            comment: {} as IComment
        }
        events.push(commentLikeEvent)
    }
    for (let i = 0; i < amount; ++i) {
        const subEvent: ISubscriptionEvent = {
            id: Math.random(),
            author: users[Math.floor(Math.random() * 5)],
            creation_date: (new Date()).toUTCString(),
            event_type: 'subscription',
        }
        events.push(subEvent)
    }
    return events
}