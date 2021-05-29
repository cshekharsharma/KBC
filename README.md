# KBC #

This is a sample KBC (Kaun Banega Crorepati) app written in golang.

The code quality is very rough, but it gets the work done! \m/


## INSTALLATION ##

 - Create a MySQL database `kbc`, and import tables/data from SQL files of [Migration](./migration) folder.
 - Update appropriate credentials in [./internals/config/database.ini](./internals/config/database.ini) file.
 - Run `kbc_launcher` binary from [bin](./bin/) folder.] using command line.
 - Open `localhost:8080` URL in web browser, and KBC works!

## License ##

This library is distributed under the MIT license found in the [LICENSE](./LICENSE) file.
