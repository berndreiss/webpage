#!/bin/bash

vowels='[aeiou]*'


result=""

for arg in $@; do
  
  number="$arg"
  
  num_array=()

  for (( i=0; i<${#number}; i++ )); do
    num_array[$i]=${number:$i:1}
  done

  regex="^$vowels"
  for num in ${num_array[@]}; do
    case $num in
      0)
        regex="$regex[scz]"
      ;;
      1)
       regex="$regex([dt]|th)"
      ;;
      2)
       regex="$regex[n]"
      ;;
      3)
       regex="$regex[m]"
      ;;
      4)
       regex="$regex[r]"
      ;;
      5)
       regex="$regex[l]"
      ;;
      6)
       regex="$regex([jg]|sh|ch|dg|zh)"
      ;;
      7)
       regex="$regex([kcgq]|ch|qu)"
      ;;
      8)
       regex="$regex[fv]"
      ;;
      9)
       regex="$regex[bp]"
      ;;
    esac 
    regex="$regex$vowels"
  done

  regex="$regex$"
  echo "$number"
  echo "$regex"
  grep -E "$regex" ~/H/words.txt
  echo -e "\n"

done

