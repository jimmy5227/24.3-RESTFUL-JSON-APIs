"""Models for Cupcake app."""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def connect_db(app):
    db.app = app
    db.init_app(app)


default = 'https://tinyurl.com/demo-cupcake'


class Cupcake(db.Model):
    __tablename__ = 'cupcakes'

    def __repr__(self):
        c = self
        return f'<id: {c.id} flavor: {c.flavor} size: {c.size} rating: {c.rating} image: {c.image}>'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    flavor = db.Column(db.String, nullable=False)
    size = db.Column(db.String, nullable=False)
    rating = db.Column(db.Float, nullable=False)
    image = db.Column(db.String, nullable=False, default=default)

    def serialize(self):
        return {
            'id': self.id,
            'flavor': self.flavor,
            'size': self.size,
            'rating': self.rating,
            'image': self.image
        }
