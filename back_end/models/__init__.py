import sqlalchemy 
from sqlalchemy import create_engine # create instance of database
from sqlalchemy.ext.declarative import declarative_base # create a catalog of all classes connected to tables
from sqlalchemy import Column, Integer, String, DateTime, Float, Boolean, ForeignKey # Allows us to create columns, with datatypes, and aslo foreign keys
from sqlalchemy.orm import relationship # Set up the relationships between our tables

Base = declarative_base() # instantiating base catalog
metadata = sqlalchemy.MetaData() # lets us use the information of the tables to create them later

### Database ORM Classes
class Groups(Base):
    __tablename__ = 'groups'
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
    isDeleted = Column(bool)

    # Relationship(s) not needed cause in Locations using back ref, so it sets this up as well
    # location = relationship('Locations', back_populates='groups')

class Locations(Base):
    __tablename__ = 'locations'
    locationID = Column(Integer, primary_key=True) 
    streetAddress = Column(String) 
    city = Column(String)
    zipID = Column(Integer, ForeignKey('zips.zipID'))
    locationName = Column(String)
   
    # Relationship(s) 
    group = relationship('Groups', uselist=False, backref='locations')

class Zip(Base):
    __tablename__ = 'zips'
    zipID = Column(Integer, primary_key=True)
    zipCode = Column(String)
    stateID = Column(Integer, ForeignKey('state.stateID'))

class State(Base):
    __tablename__ = 'state'
    stateID = Column(Integer, primary_key=True)
    stateName = Column(String)
    taxRate = Column(Float)

class Users(Base):
    __tablename__ = 'users'
    userID = Column(Integer, primary_key=True)
    nickname = Column(String)
    amountOwer = Column(Float)
    adjustedAmount = Column(Float)
    groupID = Column(Integer, ForeignKey('groups.groupID'))

class Items(Base):
    __tablename__ = 'items'
    itemID = Column(Integer, primary_key=True)
    itemName = Column(String)
    itemCost = Column(Float)
    itemQuantity = Column(Integer)
    groupID = Column(Integer, ForeignKey('groups.groupID'))

class ItemAssignments(Base):
    __tablename__ = 'itemAssignments'
    userID = Column(Integer, ForeignKey('users.userID'))
    itemID = Column(Integer, ForeignKey('items.itemsID'))