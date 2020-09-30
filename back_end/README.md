# Blitz

Have a look at our API: [Blitz API Docs](https://docs.google.com/document/d/1V7tAEWFc4g3TUQ56RxynFtgaskrnDlN5cOnF10XN2Zs/edit?usp=sharing)

When you install new imports and need to update the requirements.txt file you can run the command below, but it may include unecessary imports, so you might want to just directly add the package to the requirements.txt in a format `name==version#`:
```
pip freeze > requirements.txt
```
Be sure to be in the venv. If you aren't in the venv the pip freeze will install all
the python packages you have ever installed on the machine, when you only want the ones installed for this project.
