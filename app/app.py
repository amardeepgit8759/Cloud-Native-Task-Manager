from flask import Flask, jsonify, request
from flask_cors import CORS
from bson import ObjectId
from models import tasks

app = Flask(__name__)

CORS(
app,
origins=[
"http://localhost:5173",
"http://localhost:5174"
]
)

@app.route("/")
def home():

    return jsonify({
        "message": "Cloud Native Task Manager Running"
    })


@app.route("/health")
def health():

    return jsonify({
        "status": "healthy"
    })


@app.route("/tasks", methods=["POST"])
def create_task():

    data = request.get_json()

    title = data.get("title")

    if not title:

        return jsonify({
            "error": "title required"
        }), 400

    task = {
        "title": title,
        "completed": False
    }

    result = tasks.insert_one(task)

    return jsonify({
        "id": str(result.inserted_id),
        "message": "Task created"
    })


@app.route("/tasks")
def get_tasks():

    data = []

    for task in tasks.find():

        data.append({
            "id": str(task["_id"]),
            "title": task["title"],
            "completed": task["completed"]
        })

    return jsonify(data)


@app.route("/tasks/<task_id>", methods=["PUT"])
def update_task(task_id):

    data = request.get_json(silent=True) or {}
    task = tasks.find_one({"_id": ObjectId(task_id)})
    if not task:
        return jsonify({"error": "Task not found"}), 404

    new_completed = data.get("completed", not task.get("completed", False))

    tasks.update_one(
        {"_id": ObjectId(task_id)},
        {"$set": {"completed": new_completed}}
    )

    return jsonify({
        "id": task_id,
        "completed": new_completed,
        "message": "updated"
    })


@app.route("/tasks/<task_id>", methods=["DELETE"])
def delete_task(task_id):

    tasks.delete_one({
        "_id": ObjectId(task_id)
    })

    return jsonify({
        "message": "deleted"
    })


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )