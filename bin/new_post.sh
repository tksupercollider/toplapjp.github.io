# !/bin/bash

DATE=`date +"%Y-%m-%d"`
PATTERN="date: 2017-01-01"
REPLACE="date: ${DATE}"
OUTPUT=../src/posts/${DATE}.md

cp ../src/posts/template.md ${OUTPUT}

awk '{sub('/"${PATTERN}"'/,"'"${REPLACE}"'")}{print}' ${OUTPUT} > ${OUTPUT}.tmp

mv ${OUTPUT}.tmp ${OUTPUT}

cat ../src/data.json | jq --arg a ${DATE}.md '[{"path": $a}] + .' > ../src/_data.json 

mv ../src/_data.json ../src/data.json
