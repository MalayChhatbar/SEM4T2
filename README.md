Absolutely — let’s go through these classification algorithms and evaluation metrics in detail with Python code examples, in a college-level, easy-to-understand format.


---

Classification – Model Training and Evaluation

Classification is a supervised machine learning technique in which the model predicts discrete categories or class labels.

Examples:

Email → Spam / Not Spam

Student → Pass / Fail

Tumor → Benign / Malignant


The model is first trained using labeled data, and then its performance is evaluated using test data.


---

5.1 kNN (k Nearest Neighbours) Algorithm

The kNN algorithm is one of the simplest classification algorithms.

It classifies a new data point based on the nearest K neighbors in the dataset.


---

Working Principle

Suppose we want to classify a new point.

Steps:

Step 1: Choose K

Choose the number of neighbors.

Example:

K = 3

This means we look at the 3 nearest points.


---

Step 2: Calculate Distance

Usually Euclidean distance is used.

For two points:

d = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}


---

Step 3: Find K Nearest Points

Find the closest K points.


---

Step 4: Majority Voting

The class that appears most among neighbors becomes the predicted class.


---

Example

Height	Weight	Class

150	50	Thin
160	60	Thin
170	75	Fit
180	85	Fit


Suppose new point = (165, 65)

The nearest neighbors decide its class.


---

Python Code Example – kNN

from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.datasets import load_iris
from sklearn.metrics import accuracy_score

# Load dataset
iris = load_iris()
X = iris.data
y = iris.target

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Create kNN model
knn = KNeighborsClassifier(n_neighbors=3)

# Train model
knn.fit(X_train, y_train)

# Predict
y_pred = knn.predict(X_test)

# Accuracy
print("Accuracy:", accuracy_score(y_test, y_pred))


---

Advantages of kNN

Very simple

No training phase (lazy learner)

Good for small datasets



---

Disadvantages

Slow for large datasets

Sensitive to irrelevant features

Choosing K is important



---

Decision Tree using Entropy

A Decision Tree is a tree-like structure where decisions are made based on conditions.

Example:

Is age > 18?
   Yes → Adult
   No  → Minor


---

Important Terms

Root Node

Starting node

Internal Node

Decision node

Leaf Node

Final output / class


---

Entropy

Entropy measures impurity or randomness in the dataset.

Formula:

Entropy(S)= -\sum p_i \log_2 p_i

Where:

 = probability of class i



---

Example

Suppose:

Class	Count

Yes	5
No	5


Then:

p(Yes)=0.5

p(No)=0.5

Entropy = -(0.5 \log_2 0.5 + 0.5 \log_2 0.5)

Entropy = 1

This means maximum impurity.


---

Information Gain

Decision trees choose the feature with highest information gain.

IG = Entropy(parent) - WeightedEntropy(children)

Higher gain = better split.


---

Python Code Example – Decision Tree

from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Load data
iris = load_iris()
X = iris.data
y = iris.target

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Decision Tree using entropy
dt = DecisionTreeClassifier(criterion='entropy')

# Train
dt.fit(X_train, y_train)

# Predict
y_pred = dt.predict(X_test)

# Accuracy
print("Accuracy:", accuracy_score(y_test, y_pred))


---

5.2 Random Forest

Random Forest is an ensemble learning method.

It combines multiple decision trees.

Instead of using one tree, it uses many trees and takes majority voting.


---

Why “Forest”?

Many decision trees together = forest


---

Working

1. Create many random subsets of training data


2. Train one decision tree on each subset


3. Each tree predicts


4. Final class = majority vote




---

Example

Suppose 5 trees predict:

A, A, B, A, B

Majority = A

So final prediction = A


---

Advantages

Higher accuracy

Reduces overfitting

Works well on large datasets



---

Python Code Example – Random Forest

from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

rf = RandomForestClassifier(n_estimators=100)

rf.fit(X_train, y_train)

y_pred = rf.predict(X_test)

print("Accuracy:", accuracy_score(y_test, y_pred))


---

SVM (Support Vector Machine)

SVM is a powerful classification algorithm.

It tries to find the best boundary (hyperplane) that separates classes.


---

Example

Suppose two classes:

○ ○ ○ ○
----------------
× × × ×

The line separating them is the hyperplane.


---

Main Goal

Maximize the distance between the boundary and nearest points.

These nearest points are called support vectors.


---

Equation of Hyperplane

wx + b = 0

Where:

 = weight

 = bias



---

Types of SVM

Linear SVM

Non-linear SVM

Kernel SVM



---

Common Kernels

Linear

Polynomial

RBF



---

Python Code Example – SVM

from sklearn.svm import SVC

svm = SVC(kernel='linear')

svm.fit(X_train, y_train)

y_pred = svm.predict(X_test)

print("Accuracy:", accuracy_score(y_test, y_pred))


---

5.3 Evaluation using Confusion Matrix

After training, we need to evaluate how good the model is.

The confusion matrix is the most important tool.


---

Confusion Matrix Structure

For binary classification:

Actual / Predicted	Positive	Negative

Positive	TP	FN
Negative	FP	TN



---

Terms

True Positive (TP)

Predicted positive and actually positive

Example: Disease predicted = Yes, actual = Yes


---

True Negative (TN)

Predicted negative and actually negative


---

False Positive (FP)

Predicted positive but actually negative

Type I error


---

False Negative (FN)

Predicted negative but actually positive

Type II error


---

Python Code Example

from sklearn.metrics import confusion_matrix

cm = confusion_matrix(y_test, y_pred)

print(cm)


---

Accuracy

Accuracy means how many predictions are correct.

Accuracy = \frac{TP+TN}{TP+TN+FP+FN}


---

Example

Suppose:

TP=40,\ TN=50,\ FP=5,\ FN=5

Accuracy = \frac{40+50}{100}=0.9

Accuracy = 90\%


---

Python Code

from sklearn.metrics import accuracy_score

acc = accuracy_score(y_test, y_pred)
print("Accuracy:", acc)


---

Error Rate

Error rate means incorrect predictions.

Error\ Rate = \frac{FP+FN}{Total}

OR

Error\ Rate = 1 - Accuracy


---

Python Code

error_rate = 1 - accuracy_score(y_test, y_pred)
print("Error Rate:", error_rate)


---

Sensitivity (Recall / True Positive Rate)

Sensitivity tells how well model identifies positives.

Sensitivity = \frac{TP}{TP+FN}

Used heavily in medical diagnosis.


---

Example

TP=40,\ FN=10

Sensitivity = \frac{40}{50}=0.8

=80\%


---

Python Code

from sklearn.metrics import recall_score

sensitivity = recall_score(y_test, y_pred, average='macro')
print("Sensitivity:", sensitivity)


---

Specificity

Specificity measures how well negatives are identified.

Specificity = \frac{TN}{TN+FP}


---

Example

TN=50,\ FP=5

Specificity = \frac{50}{55}=0.909

=90.9\%


---

Python Code

tn, fp, fn, tp = confusion_matrix(y_test, y_pred).ravel()

specificity = tn / (tn + fp)

print("Specificity:", specificity)


---

Complete Combined Example

from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import confusion_matrix, accuracy_score, recall_score

# Load dataset
data = load_breast_cancer()
X = data.data
y = data.target

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Predict
y_pred = model.predict(X_test)

# Metrics
cm = confusion_matrix(y_test, y_pred)
acc = accuracy_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)

print("Confusion Matrix:\n", cm)
print("Accuracy:", acc)
print("Sensitivity:", recall)


---

Summary Table

Algorithm	Main Idea

kNN	Nearest neighbors voting
Decision Tree	Rule-based tree splitting
Random Forest	Multiple decision trees
SVM	Best separating boundary



---

Evaluation Metrics Summary

Metric	Formula

Accuracy	
Error Rate	
Sensitivity	
Specificity	



---

If you want, I can next explain **how to choose between kNN, Decision Tree, Random Forest, and SVM with real-world use cases and interview/viva points**.
