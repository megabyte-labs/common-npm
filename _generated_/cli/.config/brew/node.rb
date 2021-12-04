require "language/node"

class CommonShared < Formula
  desc "Includes common files used across different types of common file repositories (e.g. Go, Python, TypeScript, Go, more..)"
  homepage "https://megabyte.space"
  url "https://registry.npmjs.org/@installdoc/common-shared/-/common-shared-0.0.1.tgz"
  sha256 ""
  license "MIT"

  

  depends_on "node" => :build

  def install
    system "npm", "install", *Language::Node.std_npm_install_args(libexec)
    bin.install_symlink Dir["#{libexec}/bin/*"]
  end

  test do
    output = shell_output("#{bin}/@installdoc/common-shared --help 2>&1", 1)
    assert_match "You can log in via contentful login", output
    assert_match "Or provide a management token via --management-token argument", output
  end
end
