## Re-Commit to the LATEST commit (amend)  
If you make a mistake on the name of the recent commit or need to make some changes on the recent commit's code  
`$ git commit --amend`   
`$ git commit --amend -m "new message"`

## Undo Changes (revert)  
When you need to undo any changes. If it is not the recent commit, To avoid conflict, the change should not be touched.  
`$ git revert <commit>`   

## Compare Branches
The older branch should go first (General rule).  
`$ git diff master..feature`   
Check the branches that is included in the current branch(master).  
`$ git diff master..feature`  
`Reza11`  
`*master`

## Reset Branches
Move HEAD pointer to a specific commit. Be careful about amending commits which have been shared.   
### Soft
- Return to an old state and leave code changes __staged__.  
- Useful for amending one or more commits as a unique commit.   
### Mixed
- Like Soft Reset, Return to an old state and leave code changes in __working directory__.  
- Useful for reorganizing commits. 
### Hard
- Return to an old state and __discard__ all code changes.
- Useful to permanently undo commits. 
