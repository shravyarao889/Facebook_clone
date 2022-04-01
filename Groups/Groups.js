import Navbar from "../Navabr/Navbar";
import Sidebar from "../Sidebar/Sidebar";
const Groups = () => {
  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "flex",
        }}
      >
        <Sidebar />
        <div
          style={{
            width: "400px",
          }}
        ></div>
        <div>
          <div
            className="container"
            style={{
              margin: "auto",
              marginTop: "30px",
              display: "grid",
              gridTemplateColumns: "3fr 3fr 3fr",
              gap: "10px",
              backgroundColor: "#F0F2F5",
              color: "Black",
            }}
          >
            <div
              style={{
                border: "1px solid #F0F2F5",
                padding: "10px",
                background: "#fff",
              }}
            >
              <img
                src="https://www.masaischool.com/img/navbar/logo.svg"
                alt=""
                className="img"
                width="300px"
              />
              <div
                style={{
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  Masai Group
                </div>
                <button
                  style={{
                    width: "100%",
                    padding: "10px 0px",
                    border: "transparent",
                    background: "#F0F2F5",
                  }}
                >
                  Join Group
                </button>
              </div>
            </div>
            <div
              style={{
                border: "1px solid #F0F2F5",
                padding: "10px",
                background: "#fff",
              }}
            >
              <img
                src="https://cdn.pixabay.com/photo/2022/03/20/11/04/mountains-7080595__340.jpg"
                alt=""
                className="img"
                width="300px"
              />
              <div
                style={{
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  Masai Group
                </div>
                <button
                  style={{
                    width: "100%",
                    padding: "10px 0px",
                    border: "transparent",
                    background: "#F0F2F5",
                  }}
                >
                  Join Group
                </button>
              </div>
            </div>
            <div
              style={{
                border: "1px solid #F0F2F5",
                padding: "10px",
                background: "#fff",
              }}
            >
              <img
                src="https://cdn.pixabay.com/photo/2022/03/20/11/04/mountains-7080595__340.jpg"
                alt=""
                className="img"
                width="300px"
              />
              <div
                style={{
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  Masai Group
                </div>
                <button
                  style={{
                    width: "100%",
                    padding: "10px 0px",
                    border: "transparent",
                    background: "#F0F2F5",
                  }}
                >
                  Join Group
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Groups;