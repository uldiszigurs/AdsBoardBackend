const index = async (req, res) => {
    res.status(200).send({ message: 'TestMessageFromIndexController' });
  };
  
  export default index;
  