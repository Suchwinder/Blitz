import sqlalchemy 
from sqlalchemy import create_engine # create instance of database
from sqlalchemy.ext.declarative import declarative_base # create a catalog of all classes connected to tables
from sqlalchemy import Column, Integer, String, DateTime, Float, Boolean, ForeignKey # allows us to create columns, with datatypes, and aslo foreign keys
from sqlalchemy.orm import relationship # set up the relationships between our tables
from pathlib import Path # file path access
from dotenv import load_dotenv # get the env variables loaded into system environment https://github.com/theskumar/python-dotenv#readme 
import os # access the environment variables that were loaded

# give path location
env_path = Path('..')/'.env'
load_dotenv(dotenv_path=env_path)

DATABASE_URI = os.getenv('DATABASE_URI') # have saved variables 
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
    zipID = Column(Integer, ForeignKey('groups.groupID'))
    locationName = Column(String)
   
    # Relationship(s) 
    group = relationship('Groups', uselist=False, backref='locations')
