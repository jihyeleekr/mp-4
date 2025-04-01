export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-yellow-100 to-white p-6 text-center">
            <h1 className="text-3xl font-bold mb-4">🌤️ Welcome to Jihye`s Weather Website!</h1>
            <p className="text-lg text-gray-700 max-w-md">
                This app lets you check the current weather and forecast for any city around the world.
                Just type a location on the search page and hit <span className="font-semibold">`Get Weather`</span> to see the results!
            </p>
        </div>
    );
}
