const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/exercise-1", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to mongoDB")).catch((err) => {
    console.log("Failed to connect to DB");
});

const courseSchema = mongoose.Schema({
    tags: [String],
    date: Date,
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
});



const Course = mongoose.model("Course", courseSchema);

async function exercise1() {
    const courses = await Course.find({
            isPublished: true,
            tags: {
                $in: ["backend"]
            }
        })
        .sort({
            name: 1
        }).select({
            name: 1,
            author: 1,
            isPublished: 1
        });
    console.log(`Courses: ${courses}`)
}
//exercise1()



async function exercise2() {
    const selection = {
        name: 1,
        author: 1,
        price: 1
    };

    const courses = await Course.find({
        isPublished: true,
        tags: {
            $in: ["frontend", "backend"]
        }
    }).sort({
        price: -1
    }).select(selection);

    console.log(`Courses: ${courses}`)
}


async function exercise3() {
    const courses = await Course.find({
            isPublished: true

        })
        .or([{
                price: {
                    $gte: 15
                }
            },
            {
                name: /.*by.*/
            }
        ]).select({

            price: 1,
            name: 1
        })
    console.log(`Courses: ${courses}`)
}
//exercise1()
//exercise2()
exercise3()