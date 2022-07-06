import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { Button, Card, Grid, Container, Image, Modal } from "semantic-ui-react";
import { collection, deleteDoc, onSnapshot, doc } from "firebase/firestore";
import ModalComp from "../components/ModalComp";
import { async } from "@firebase/util";
import Spinner from "../components/Spinner";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // for rendering added users info
  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setUsers(list);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const handleModal = (item) => {
    setOpen(true);
    setUser(item);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Ary you sure that you want to delete this user ?")) {
      try {
        setOpen(false);
        await deleteDoc(doc(db, "users", id));
        setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Container>
      <Grid columns={3} stackable>
        {users &&
          users.map((item) => {
            return (
              <Grid.Column key={item.id}>
                <Card>
                  <Card.Content>
                    <Image
                      src={item.img}
                      size="medium"
                      style={{ height: "150px", width: "150px", borderRadius: "50%" }}
                    />
                    <Card.Header style={{ marginTop: "10px" }}>{item.name}</Card.Header>
                    <Card.Description>{item.email}</Card.Description>
                  </Card.Content>

                  <Card.Content extra>
                    <div>
                      <Button color="green" onClick={() => navigate(`/update/${item.id}`)}>
                        Update
                      </Button>
                      <Button color="purple" onClick={() => handleModal(item)}>
                        View
                      </Button>
                      {open && (
                        <ModalComp
                          open={open}
                          setOpen={setOpen}
                          handleDelete={handleDelete}
                          {...user}
                        />
                      )}
                    </div>
                  </Card.Content>
                </Card>
              </Grid.Column>
            );
          })}
      </Grid>
    </Container>
  );
};

export default Home;
