import sqlalchemy 
import os # access the environment variables that were loaded
from sqlalchemy import create_engine # create instance of database
from sqlalchemy import Column, Integer, String, DateTime, Float, Boolean, ForeignKey # allows us to create columns, with datatypes, and aslo foreign keys
from sqlalchemy.orm import relationship, sessionmaker # set up the relationships between our tables and set upa connection for each request
from sqlalchemy_utils import create_database, database_exists # to create database, and check if exists
from sqlalchemy.ext.declarative import declarative_base # create a catalog of all classes connected to tables

# SQLALCHEMY is built on top of psycopg2, for some reason didnt install with sqlalchemy, it should by default, so need
# install it, in order for sqlalchemy to be utilized
Base = declarative_base() # instantiating base catalog that houses all tables, see below when creating tables

# os can load variables from the system environment, but to load variable in first 
# need to use a specific comman in README.md -> reference: https://pypi.org/project/python-dotenv/
DATABASE_URI = os.getenv('DATABASE_URI') 
engine = create_engine(DATABASE_URI, echo=False) # need to connect to server, explanation: when we want to connect to database, upon our application launching we need some object to contain the info about our database, this is waht this vairbale does. https://hackersandslackers.com/python-database-management-sqlalchemy/

### Database Creation
def bootDB():    
    if not database_exists(engine.url):
        create_database(engine.url)
        print("Creating Database")
        Base.metadata.create_all(engine)
        print("Creating Tables")
    else:
        print("Database Already Exists")

Session = sessionmaker(bind=engine) # this object can be used to make a session later on, using the engine as its configuration so each session will use the enginer to aquire its resources

### Create a Database Connection after each request
def create_db_connection():
    session = Session()
    return session

# Do not need to close session/connection manually, after commit it will close it

### Database ORM Classes
class Groups(Base):
    __tablename__ = 'groups'

    # Columns
    groupID = Column(Integer, primary_key=True)
    groupURL = Column(String)
    locationID = Column(Integer, ForeignKey('locations.locationID'))
    imageURL = Column(String)
    tipRate = Column(Float)
    subTotal = Column(Float)
    totalCost = Column(Float)
    linkExpiration = Column(DateTime)
    userCount = Column(Integer)
    totalAdjustment = Column(Float)
    isDeleted = Column(Boolean)

    # Relationship(s) not needed cause in Locations using back ref, so it sets this up as well
    # location = relationship('Locations', back_populates='groups')

class Locations(Base):
    __tablename__ = 'locations'

    # Columns
    locationID = Column(Integer, primary_key=True) 
    streetAddress = Column(String) 
    city = Column(String)
    zipID = Column(Integer, ForeignKey('zips.zipID'))
    locationName = Column(String)
   
    # Relationship(s) 
    group = relationship('Groups', uselist=False, backref='locations')

class Zips(Base):
    __tablename__ = 'zips'

    # Columns
    zipID = Column(Integer, primary_key=True)
    zipCode = Column(String)
    stateID = Column(Integer, ForeignKey('state.stateID'))

    # Relationship(s)
    locations = relationship('Locations', backref='zips')

class State(Base):
    __tablename__ = 'state'

    # Columns
    stateID = Column(Integer, primary_key=True)
    stateName = Column(String)
    taxRate = Column(Float)

    # Relationships
    zips = relationship('Zips', backref='state')

class Users(Base):
    __tablename__ = 'users'

    # Columns
    userID = Column(Integer, primary_key=True)
    nickname = Column(String)
    amountOwer = Column(Float)
    adjustedAmount = Column(Float)
    groupID = Column(Integer, ForeignKey('groups.groupID'))

    # Relationships
    group = relationship('Groups', backref='users')

class Items(Base):
    __tablename__ = 'items'

    # Columns
    itemID = Column(Integer, primary_key=True)
    itemName = Column(String)
    itemCost = Column(Float)
    itemQuantity = Column(Integer)
    groupID = Column(Integer, ForeignKey('groups.groupID'))

    # Relationships
    group = relationship('Groups', backref='items')

class ItemAssignments(Base):
    __tablename__ = 'itemAssignments'

    # Columns
    itemAssignmentID = Column(Integer, primary_key=True)
    userID = Column(Integer, ForeignKey('users.userID'))
    itemID = Column(Integer, ForeignKey('items.itemID'))

    # Relationships
    user = relationship('Users', backref='itemAssignments')
    item = relationship('Items', backref='itemAssignments')

# Since we are using the ORM and not CORE we treat each table as a business object     
