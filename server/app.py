#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session, send_from_directory
from flask_restful import Resource
from werkzeug.utils import secure_filename
import os
from models import User, Trip, Place, Wish

from config import app, api, db, UPLOAD_FOLDER, ALLOWED_EXTENSIONS


app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# checking file upload type for users images
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/')
def index():
    return '<h1>Final Project Server!</h1>'

@app.route('/users', methods=['GET', 'POST'])
def Users():
    if request.method == 'GET':
        users = [u.to_dict() for u in User.query.all()]
        return make_response( users, 200 )

    if request.method == 'POST':
        data = request.get_json()
        try:
            new_user = User(
                username = data['username'],
                password_hash = data['password']
            )
            db.session.add(new_user)
            db.session.commit()
            #session['user_id'] = new_user.id # <-- cookie
            return make_response(new_user.to_dict(),201)
        except ValueError as v_error:
            return make_response({'errors':[v_error]},400)
        
@app.route('/users/<int:id>/trips', methods=['GET'])
def user_id(id):
    user = User.query.filter(User.id == id).first()

    if request.method == 'GET':
        if user == None:
            return make_response({'error': 'User not found.'}, 404)
    
        user_data = user.to_dict()
        user_trips = [trip.to_dict() for trip in user.trips]
        
        user_data['trips'] = user_trips
    
        return make_response(user_data, 200)

@app.route('/places', methods=['GET'])
def places():
    if request.method == 'GET':
        places = [p.to_dict() for p in Place.query.all()]
        return make_response(places, 200)
    

@app.route('/trips', methods=['GET', 'POST'])
def trips():
    if request.method == 'GET':
        trips = [t.to_dict() for t in Trip.query.all()]
        return make_response(trips, 200)
    
    if request.method == 'POST':
        data = request.get_json()
        try:
            new_trip = Trip(
                user_id = data['user_id'],
                place_id = data['place_id'],
                rating = int(data['rating']),
                comments = data['comments']
            )
            db.session.add(new_trip)
            db.session.commit()
            return make_response(new_trip.to_dict(), 201)
        except Exception as e:
            return make_response({"errors": [str(e)]}, 400)
        

@app.route('/trips/<int:id>', methods=['DELETE', 'PATCH'])
def trip_id(id):
    trip = Trip.query.filter(Trip.id == id).first()
    
    if request.method == 'DELETE':
        if trip == None:
            return make_response({'error': 'Trip not found'}, 404)
        
        db.session.delete(trip)
        db.session.commit()
        return make_response({'message':'Successfully deleted the trip.'},204)

    if request.method == 'PATCH':
        if trip == None:
            return make_response({'error': 'Trip not found'}, 404)
        
        data = request.get_json()
        for attr in data:
            setattr(trip, attr, data[attr])
        db.session.add(trip)
        db.session.commit()
        return make_response(trip.to_dict(), 200)
    

@app.route('/wishes', methods=['GET', 'POST'])
def wishes():
    if request.method == 'GET':
        wishes = [w.to_dict() for w in Wish.query.all()]
        return make_response(wishes, 200)
    
    if request.method == 'POST':
        data = request.get_json()
        try:
            new_wish = Wish(
                user_id = data['user_id'],
                place_id = data['place_id']
            )
            db.session.add(new_wish)
            db.session.commit()
            return make_response(new_wish.to_dict(), 201)
        except Exception as e:
            return make_response({"errors": [str(e)]}, 400)
        

@app.route('/wishes/<int:id>', methods=['DELETE',])
def wish_id(id):
    wish = Wish.query.filter(Wish.id == id).first()
    
    if request.method == 'DELETE':
        if wish == None:
            return make_response({'error': 'wish not found'}, 404)
        
        db.session.delete(wish)
        db.session.commit()
        return make_response({'message':'Successfully deleted the wish.'},204)


# user login and auth
@app.route('/login', methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter_by(username = data["username"]).first()
    if not user:
        return make_response({"error": "User not found"}, 400)
    if user.authenticate(data["password"]):
        session["user_id"] = user.id
        print(session["user_id"])
        return make_response(user.to_dict(only=('username','id', 'profile_image')), 200)
    else:
        return make_response({"error": "Incorrect password"}, 400)


@app.route('/signup', methods=["POST"])
def signup():
    # this is saving the form data because we are sending both JSON and file data(the image)
    username = request.form["username"]
    password = request.form["password"]

    # Check if 'image' is present in request.files
    if 'image' in request.files:
        image_file = request.files['image']
        if not allowed_file(image_file.filename):
            return make_response({"error": "Invalid file type"}, 400)

        # getting the filename from the image_file metadata and then using werkzeug's secure_filename() to remove or replace any potentially harmful characters in the filename. Storing new sanitized filename in the filename variable.
        filename = secure_filename(image_file.filename)
        # combining multiple paths into a single path using python's os module. Helps ensure the appropriate path for different operating systems. 
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        # save the image file to image_path
        image_file.save(image_path)
    else:
        # Set a default profile image URL if 'image' is not in request.files
        default_image_url = 'http://127.0.0.1:5555/static/profile_photos/blank-user.png'
        try:
            new_user = User(
                username=username,
                password_hash=password,
                profile_image = default_image_url
            )
            db.session.add(new_user)
            db.session.commit()
            session["user_id"] = new_user.id
            return make_response(new_user.to_dict(only=('username','id', 'profile_image')), 201)
        except ValueError as v_error:
            return make_response({"error":[v_error]}, 400)

    try:
        new_user = User(
            username=username,
            password_hash=password,
            profile_image=f'http://127.0.0.1:5555/{image_path}'
        )
        db.session.add(new_user)
        db.session.commit()
        session["user_id"] = new_user.id
        return make_response(new_user.to_dict(only=('username','id', 'profile_image')), 201)
    except ValueError as v_error:
        return make_response({"error":[v_error]}, 400)
  

@app.route('/authorized', methods=["GET"])
def authorized():
    try:
        user = User.query.filter_by(id=session.get("user_id")).first()
        return make_response( user.to_dict(only=('username','id', 'profile_image')), 200)
    except:
        return make_response({"error": "Please log in or sign up"}, 401)

@app.route('/logout', methods=["DELETE"])
def logout():
    del session['user_id']
    return make_response({"message": "logout successful"}, 204)

@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static',path)



if __name__ == '__main__':
    app.run(port=5555, debug=True)