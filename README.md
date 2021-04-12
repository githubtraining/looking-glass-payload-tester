# looking-glass-payload-tester

action to quickly test Looking Glass behavior when altering payload data

Configuration is easy!

1. Create a new workflow file in the repo you wish to use for testing
1. Add the following contents to the repo

```yaml
name: Looking Glass Payload Tester
on:
  workflow_dispatch:
    inputs:
      filename:
        description: "string for a filename if your payload needs one"
        required: true
      is_correct:
        description: "a boolean value for the isCorrect field"
        required: true
      level:
        description: "string value of a supported Looking Glass level"
        required: true
      display_type:
        description: "string value of a supported Looking Glass display type"
        required: true
      msg:
        description: "string value of a message if your payload has one, can be an empty string"
        required: true
      error_expected:
        description: "string value of the error.expected field of a Looking Glass payload"
        required: true
      error_got:
        description: "string value of the error.got field of a Looking Glass payload"
        required: true

jobs:
  create_payload:
    runs-on: ubuntu-latest
    steps:
    - uses: githubtraining/looking-glass-payload-tester@v1.0
      id: events
      with:
        filename: ${{ github.event.inputs.filename }}
        isCorrect: ${{ github.event.inputs.is_correct }}
        level: ${{ github.event.inputs.level }}
        display_type: ${{ github.event.inputs.display_type }}
        msg: ${{ github.event.inputs.msg }}
        error_expected: ${{ github.event.inputs.error_expected }}
        error_got: ${{ github.event.inputs.error_got }}
        
    - uses: githubtraining/looking-glass-action@v0.1.0
      with:
        github-token: ${{ secrets.GITHUB_TOKEN }}
        feedback: ${{ steps.events.outputs.reports }}
```

1. Click the actions tab of your repository
   ![image](https://user-images.githubusercontent.com/38021615/114465997-bc393000-9b9c-11eb-984b-77b71063a897.png)
1. Select the `Looking Glass Payload Tester` from the list of configured workflows (if you changed the contents of the example file above your's may be named differently)
   ![image](https://user-images.githubusercontent.com/38021615/114466056-cc510f80-9b9c-11eb-8df6-9002822b1cec.png)
1. Click the `Run workflow` button on the upper right corner of the middle section of your screen and supply your input values to create a payload Looking Glass can understand
   ![image](https://user-images.githubusercontent.com/38021615/114465906-a0358e80-9b9c-11eb-9e00-26c21f0de76e.png)
1. Click the green `Run workflow` button to execute the workflow
1. Check your actions logs and other payload `diaplay_types` for Looking Glass feedback :tada:

**It is useful to enable actions debugging while working with Looking Glass as an author. To do so set the proper repository secrets!**
