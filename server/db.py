import os
from google.cloud import bigtable
from google.cloud.bigtable import column_family, row_filters
from dotenv import load_dotenv
import uuid

load_dotenv()

projectID = os.environ["PROJECT_ID"]
instanceID = os.environ["INSTANCE_ID"]
tableID = "users"


# Connect to Bigtable
client = bigtable.Client(project=projectID, admin=True)
instance = client.instance(instanceID)
table = instance.table(tableID)

# Create a table if not exists
if not table.exists():
    print("Creating the {} table.".format(tableID))
    table.create()
    column_family_id = "cf1"
    cf1 = table.column_family(column_family_id)
    cf1.create()


def addUser(data):
    user_id = str(uuid.uuid4())
    row = table.direct_row(user_id)
    for column, value in data.items():
        col_family, col_qualifier = column.split(":")
        row.set_cell(col_family, col_qualifier, value)
        row.commit()


def authUser(email, password):
    rows = table.read_rows()
    user = {}

    for row in rows:
        try:
            for column, cell in row.cells.items():
                rowEmail = cell[b"email"][0].value.decode("utf-8")
                rowPassword = cell[b"password"][0].value.decode("utf-8")
                if rowEmail == email and rowPassword == password:
                    user["id"] = row.row_key.decode("utf-8")
                    user["name"] = cell[b"name"][0].value.decode("utf-8")
                    user["email"] = rowEmail
                    user["password"] = rowPassword
                    return user
        except:
            continue

    return None


def delete_user(table, user_id):
    row = table.direct_row(user_id)
    row.delete()
    row.commit()
    print(f"Deleted user {user_id}")
