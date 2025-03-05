const PostCard = () => {
    return (
        <article className="rounded-xl border-2 border-gray-100 bg-white">
            <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
                <a href="#" className="block shrink-0">
                    <img
                        alt="User avatar"
                        src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
                        className="size-14 rounded-lg object-cover"
                    />
                </a>
                <div className="w-full">
                    <div className="flex justify-between">
                        <h3 className="font-medium sm:text-lg">
                            <a href="#" className="hover:underline">John Smith</a>
                        </h3>
                        <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>

                    <p className="mt-2 text-sm text-gray-700">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus, accusantium temporibus
                        iure delectus ut totam natus nesciunt ex? Ducimus, enim.
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <span className="text-sm">124 likes</span>
                            </button>

                            <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                                    />
                                </svg>
                                <span className="text-sm">14 comments</span>
                            </button>
                        </div>

                        <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                            <span className="text-sm">Share</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Optional trending/popular indicator */}
            <div className="flex justify-end">
                <div className="-me-[2px] -mb-[2px] inline-flex items-center gap-1 rounded-ss-xl rounded-ee-xl bg-blue-600 px-3 py-1.5 text-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                    </svg>
                    <span className="text-[10px] font-medium sm:text-xs">Trending</span>
                </div>
            </div>
        </article>
    )
}

export default PostCard