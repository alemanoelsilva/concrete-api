#!/bin/bash

npm test



echo "Are you doing Deploy? What comment would you like to do?"

read comment

git add .

git commit -m $comment

git push origin master
