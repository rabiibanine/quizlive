{
  description = "NodeJS dev shell";

  inputs = {
    nixpkgs = {
      url = "github:nixos/nixpkgs/b12141ef619e0a9c1c84dc8c684040326f27cdcc";
    };
  };

  outputs =
    { self, nixpkgs, ... }@inputs:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in
    {
      devShells.${system}.default = pkgs.mkShell {

        packages = with pkgs; [
          nodejs_24
        ];

        buildInputs = with pkgs; [

        ];

        shellHook = ''

        '';

      };
    };

}
