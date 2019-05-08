import pandas as pd
import numpy as np
import tensorflow
import keras
from sklearn import linear_model
from sklearn import model_selection
from sklearn.utils import shuffle
import matplotlib.pyplot as pyplot
import pickle
from matplotlib import style

data = pd.read_csv("student-mat.csv", sep=";")

data = data[["G1", "G2", "G3", "studytime", "failures", "absences"]]

predict = "G3"

X = np.array(data.drop([predict], 1))
Y = np.array(data[predict])
x_train, x_test, y_train, y_test = model_selection.train_test_split(X, Y, test_size=0.1)

""" TRAIN AND STORE VALUES IF THE ACCURACY IS HIGH ENOUGH """
"""
best = 0
for _ in range(30):

    x_train, x_test, y_train, y_test = model_selection.train_test_split(X, Y, test_size=0.1)

    linear = linear_model.LinearRegression()

    linear.fit(x_train, y_train)
    acc = linear.score(x_test, y_test)
    print(acc)

    if acc > best:
        best = acc
        with open("studentmodel.pickle", "wb") as f:
            pickle.dump(linear, f)         
"""

""" GET THE SAVED DATA FROM THE FILE """
pickle_in = open("studentmodel.pickle", "rb")
linear = pickle.load(pickle_in)

print("Co: ", linear.coef_)
print("Intercept: ", linear.intercept_)

predictions = linear.predict(x_test)

for x in range(len(predictions)):
    print(predictions[x], x_test[x], y_test[x])

""" PLOT A GRAPH USING THE DATA """
p = 'absences'
style.use("ggplot")
pyplot.scatter(data[p], data["G3"])
pyplot.xlabel(p);
pyplot.ylabel("Final Grade")
pyplot.show()
