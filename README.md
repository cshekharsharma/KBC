# KBC #

This is a sample KBC (Kaun Banega Crorepati) webapp written in golang.

The code quality is very rough, but it gets the work done! \m/


## Installation ##

 - Create a MySQL database `kbc`, and import tables/data from SQL files of [Migration](./migration) folder.
 - Update appropriate credentials in [./config/database.ini](./config/database.ini) file.
 - Run [bin](./build.sh to build the application, and that will create the runnable binary in [bin](./bin/) folder.
 - Run `KBC` binary from [bin](./bin/) folder, using command line.
 - Open `localhost:8080` URL in web browser, and KBC works!

## License ##

This library is distributed under the MIT license found in the [LICENSE](./LICENSE) file.
