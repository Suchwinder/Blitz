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

    # Relationship(s)
    location = relationship('Locations', uselist=False, backref='groups')

class Locations(Base):
    __tablename__ = 'locations'
    locationID = Column(Integer, primary_key=True) 
    streetAddress = Column(String) 
    city = Column(String)
    zipID = Column(Integer, ForeignKey('groups.groupID'))
    locationName = Column(String)
   
    # Relationship(s) not needed cause in Groups using back ref, so it sets this up as well
    # group = relationship('Groups', back_populates='locations')
