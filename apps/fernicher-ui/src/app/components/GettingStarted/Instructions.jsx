import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

const Instructions = ({activeStep}) => {
  const instructions = {
    0: <>
      <strong><h3>Welcome To Fernicher! The World's first FREE fernicher exchange!</h3></strong>
      <p>Unlike other marketplaces, Fernicher is a place where people can donate and pickup free furniture in their area.
        <br/>
        <br/>
        Firstly, in order to get access to all features such as posting your furniture for donation, messaging other doners, favourite your most wanted items, and to join our growing community, please <strong>Login or Signup!</strong><br/>
      </p>
      </>,
    1:<>
    <p><strong>Moving soon and have some furniture to donate?</strong> Post your furniture by clicking <AddAPhotoIcon/></p>
    <br/>
    </>,
    2: <>
    <p><strong>Looking for free furniture?</strong> Use the map to find nearby items OR filter by category/keyword to find exact matchings!</p>
    <br/>
    </>,
    3: <h3>And that's it!</h3>
  }

  return (
    <div>
     {instructions[activeStep]}
    </div>
  )
}

export default Instructions;
